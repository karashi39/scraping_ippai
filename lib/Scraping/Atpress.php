<?php
namespace Scraping;

class Atpress extends \Base\PressScrapingAbstract
{
    protected $introducer_name = 'atpress';
    protected $site_url = "https://www.atpress.ne.jp";
    protected $search_urlstr = "/news/search/?q=";
    const PAGE_SIZE = 20;
    
    public function getMaxPageNumber($doc)
    {
        return 1;
    }
    
    public function getPressInfoList($doc)
    {
        $press_info_list = $doc->find("div.pressrelease");
        $press_info_list = $press_info_list->find("div.list");
        return $press_info_list;
    }
    
    public function getPressTitle($press_info)
    {
        $press_title = $press_info->find("p.ttl")->text();
        $press_title = str_replace("\n", " ", $press_title);
        $press_title = trim($press_title);
        return $press_title;
    }
    
    public function getPressPageURL($press_info)
    {
        $press_page_URL = $press_info->find("p.ttl")->find("a")->attr("href");
        $press_page_URL = $press_page_URL;
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
        $company_name = $press_info->find("p.publisher")->text();
        $company_name = str_replace("のプレスリリース", "", $company_name);
        $company_name = trim($company_name);
        return $company_name;
    }
    
    public function getPressBody($doc)
    {
        $press_body = $doc->find('div.txt')->html();
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
