<?php
namespace Base;

use JonnyW\PhantomJs\Client as Client;

abstract class PressScrapingAbstract implements PressScrapingInterface
{
    protected $introducer_name = 'introducer';
    protected $access_method = 'file_get_contents';
    protected $site_url = 'https://site.url';
    protected $search_urlstr = '/search?keyword=';
    protected $search_urlstr_post = '';
    protected $page_urlstr = '&p=';
    
    public function getHTML($url, $method = 'file_get_contents')
    {
        if ($method == 'phantom_js') {
            $html = $this->getHTMLByPhantomJS($url);
        } elseif ($method == 'curl') {
            $html = $this->getHTMLByCurl($url);
        } else {
            $html = $this->getHTMLByFileGetContents($url);
        }
        return $html;
    }
    
    public function scrapeMaxPageNumber($url)
    {
        $html = $this->getHTML($url, $this->access_method);
        $doc = \phpQuery::newDocument($html);
        $max_page_number = $this->getMaxPageNumber($doc);
        if (ctype_digit($max_page_number)) {
            return 1;
        }
        return $max_page_number;
    }
    
    public function scrapePressInfo($url)
    {
        $html = $this->getHTML($url, $this->access_method);
        $doc = \phpQuery::newDocument($html);
        $press_info_list = $this->getPressInfoList($doc);
        $press_info_array = [];
        foreach ($press_info_list as $press_info) {
            //phpQueryObject casted into DOMElement when processed with foreach.
            $press_info = \phpQuery::newDocument($press_info->C14N());
            array_push($press_info_array, $press_info);
        }
        return $press_info_array;
    }
    
    public function scrapePressDetail($press_info)
    {
        $press_detail = [
            "introducer" => $this->introducer_name,
            "press_title" => $this->getPressTitle($press_info),
            "press_page_url" => $this->getPressPageURL($press_info),
            "issue_datetime" => $this->getIssueDatetime($press_info),
            "company_name" => $this->getCompanyName($press_info),
        ];
        [$press_body, $press_description] = $this->scrapePressEach($press_detail["press_page_url"]);
        $press_detail["press_body"] = $press_body;
        $press_detail["press_description"] = $press_description;
        return $press_detail;
    }
    
    public function scrapePressEach($url)
    {
        $html = $this->getHTML($url, $this->access_method);
        $doc = \phpQuery::newDocument($html);
        $press_body = $this->getPressbody($doc);
        $press_description = $this->getPressDescription($doc);
        return [$press_body, $press_description];
    }
    
    private function getHTMLByPhantomJS($url)
    {
        $client = Client::getInstance();
        $client->getEngine()->setPath(PHANTOMJS_PATH);
        $request = $client->getMessageFactory()->createRequest();
        $response = $client->getMessageFactory()->createResponse();
        $request->setUrl($url);
        $client->send($request, $response);
        $html = $response->getContent();
        $dom = new \DOMDocument();
        @$dom->loadHTML($html);
        $dom->saveHTML();
        $html = $dom;
        return $html;
    }
    
    private function getHTMLByFileGetContents($url)
    {
        $context = stream_context_create([
            'http' => array('ignore_errors' => true)
        ]);
        $html = file_get_contents($url, false, $context);
        $pos = strpos($http_response_header[0], '200');
        if ($pos === false) {
            // retry
            $html = file_get_contents($url);
        }
        
        return $html;
    }
    
    private function getHTMLByFileGetContentsWithoutSSL($url)
    {
        $context = stream_context_create([
            'http' => ['ignore_errors' => true],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ]);
        $html = file_get_contents($url, false, $context);
        $pos = strpos($http_response_header[0], '200');
        if ($pos === false) {
            // retry
            $html = file_get_contents($url);
        }
        return $html;
    }
    
    private function getHTMLByCurl($url)
    {
        exec('curl --silent ' . $url, $html);
        $html = implode($html);
        return $html;
    }
    
    public function genSearchURL($search_keyword)
    {
        $urls = [];
        $search_keyword = urlencode($search_keyword);
        $search_url = $this->site_url
             . $this->search_urlstr . $search_keyword . $this->search_urlstr_post;
        array_push($urls, $search_url);
        
        $max_page_number = $this->scrapeMaxPageNumber($search_url);
        if ($max_page_number >= 2) {
            for ($i = 2; $i <= $max_page_number; $i++) {
                $nextpage_search_url = $search_url . $this->page_urlstr . (string) $i;
                array_push($urls, $nextpage_search_url);
            }
        }
        return $urls;
    }
}
