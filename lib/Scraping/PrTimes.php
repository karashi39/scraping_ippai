<?php
namespace Scraping;

class PrTimes extends \Base\PressScrapingAbstract
{
    protected $introducer_name = 'pr-times';
    protected $site_url = "https://prtimes.jp";
    protected $search_urlstr = "/main/action.php?run=html&page=searchkey&search_word=";
    protected $search_urlstr_post = "&search_pattern=1";
    const PAGE_SIZE = 20;
    
    public function getMaxPageNumber($doc)
    {
        return 1;
    }
    
    public function getPressInfoList($doc)
    {
        $press_info_list = $doc->find("div.container-thumbnail-list");
        $press_info_list = $press_info_list->find("article.item-ordinary");
        return $press_info_list;
    }
    
    public function getPressTitle($press_info)
    {
        $press_title = $press_info->find("h3")->text();
        $press_title = trim($press_title);
        return $press_title;
    }
    
    public function getPressPageURL($press_info)
    {
        $press_page_URL = $press_info->find("h3")->find("a")->attr("href");
        $press_page_URL = $this->site_url . $press_page_URL;
        return $press_page_URL;
    }
    
    public function getIssueDatetime($press_info)
    {
        $issue_datetime = $press_info->find("time")->attr("datetime");
        $issue_datetime = new \DateTime($issue_datetime);
        $issue_datetime = $issue_datetime->format("Y/m/d H:i");
        return $issue_datetime;
    }
    
    public function getCompanyName($press_info)
    {
        $company_name = $press_info->find("a.name-company")->text();
        $company_name = trim($company_name);
        return $company_name;
    }
    
    public function getPressBody($doc)
    {
        $press_body = $doc->find('.rich-text')->text();
        $press_body = trim($press_body);
        $press_body = nl2br($press_body);
        return $press_body;
    }
    
    public function getPressDescription($doc)
    {
        $press_description = $doc->find('meta[property="og:description"]')->attr("content");
        return $press_description;
    }
}
