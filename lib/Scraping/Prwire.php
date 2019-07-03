<?php
namespace Scraping;

class Prwire extends \Base\PressScrapingAbstract
{
    protected $introducer_name = 'prwire';
    protected $site_url = "https://kyodonewsprwire.jp/";
    protected $search_urlstr = "/search?s=";
    protected $page_urlstr = "&page=";
    const PAGE_SIZE = 20;
    
    public function getMaxPageNumber($doc)
    {
        return 1;
    }
    
    public function getPressInfoList($doc)
    {
        $press_info_list = $doc->find("div.search-area");
        $press_info_list->find('form')->remove();
        $press_info_list = $press_info_list->find("div.row");
        return $press_info_list;
    }
    
    public function getPressTitle($press_info)
    {
        $press_title = $press_info->find("h4")->text();
        $press_title = trim($press_title);
        return $press_title;
    }
    
    public function getPressPageURL($press_info)
    {
        $press_page_URL = $press_info->find("h4")->find("a")->attr("href");
        return $press_page_URL;
    }
    
    public function getIssueDatetime($press_info)
    {
        $issue_datetime = $press_info->find("span.timearea")->text();
        $issue_datetime = new \DateTime($issue_datetime);
        $issue_datetime = $issue_datetime->format("Y/m/d");
        $issue_datetime = $issue_datetime . " 00:00";
        return $issue_datetime;
    }
    
    public function getCompanyName($press_info)
    {
        $company_name = $press_info->find("p.logoarea")->text();
        $company_name = trim($company_name);
        return $company_name;
    }
    
    public function getPressBody($doc)
    {
        $press_body = $doc->find('div.release-body')->html();
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
