<?php
namespace Scraping;

class News2u extends \Base\PressScrapingAbstract
{
    protected $introducer_name = 'news2u';
    protected $site_url = "https://www.news2u.net";
    const PAGE_SIZE = 20;
    
    public function getMaxPageNumber($doc)
    {
        $max_page_number = $doc->find(".page_information")->find("p.total")->text();
        $max_page_number = preg_replace("/[^0-9]/", "", $max_page_number);
        $max_page_number = (int) ceil($max_page_number / self::PAGE_SIZE);
        return $max_page_number;
    }
    
    public function getPressInfoList($doc)
    {
        $press_info_list = $doc->find("div.release_information");
        return $press_info_list;
    }
    
    public function getPressTitle($press_info)
    {
        $press_title = $press_info->find(".release_title")->text();
        $press_title = utf8_decode($press_title);
        $press_title = str_replace("\n", " ", $press_title);
        $press_title = trim($press_title);
        return $press_title;
    }
    
    public function getPressPageURL($press_info)
    {
        $press_page_URL = $press_info->find(".release_title")->find("a")->attr("href");
        $press_page_URL = $this->site_url . $press_page_URL;
        return $press_page_URL;
    }
    
    public function getIssueDatetime($press_info)
    {
        $issue_datetime = $press_info->find(".release_date")->text();
        $issue_datetime = preg_replace("/[^0-9]/", "", $issue_datetime);
        $issue_datetime = new \DateTime($issue_datetime);
        $issue_datetime = $issue_datetime->format("Y/m/d H:i");
        return $issue_datetime;
    }
    
    public function getCompanyName($press_info)
    {
        $company_name = $press_info->find(".release_corporation")->text();
        $company_name = utf8_decode($company_name);
        $company_name = trim($company_name);
        return $company_name;
    }
    
    public function getPressBody($doc)
    {
        $press_body = $doc->find('.release_contents')->html();
        $press_body = utf8_decode($press_body);
        $press_body = trim($press_body);
        return $press_body;
    }
    
    public function getPressDescription($doc)
    {
        $press_description = $doc->find('meta[property="og:description"]')->attr("content");
        $press_description = utf8_decode($press_description);
        return $press_description;
    }
}
