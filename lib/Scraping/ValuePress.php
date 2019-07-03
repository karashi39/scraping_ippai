<?php
namespace Scraping;

class ValuePress extends \Base\PressScrapingAbstract
{
    protected $introducer_name = 'value-press';
    protected $site_url = "https://www.value-press.com";
    protected $search_urlstr = "/search?article[q]=";
    protected $page_urlstr = "&page=";
    const PAGE_SIZE = 20;
    
    public function getMaxPageNumber($doc)
    {
        $max_page_number = $doc->find("h1.list_view_subtitle")->text();
        $max_page_number = preg_replace("/[^0-9]/", "", $max_page_number);
        $max_page_number = (int) ceil($max_page_number / self::PAGE_SIZE);
        return $max_page_number;
    }
    
    public function getPressInfoList($doc)
    {
        $press_info_list = $doc->find("div.pressrelease_article");
        return $press_info_list;
    }
    
    public function getPressTitle($press_info)
    {
        $press_title = $press_info->find("h2")->text();
        $press_title = trim($press_title);
        return $press_title;
    }
    
    public function getPressPageURL($press_info)
    {
        $press_page_URL = $press_info->find("a")->attr("href");
        $press_page_URL = $this->site_url . $press_page_URL;
        return $press_page_URL;
    }
    
    public function getIssueDatetime($press_info)
    {
        $issue_datetime = $press_info->find(".release_tag")->find("li:eq(0)");
        $issue_datetime->find("span")->remove();
        $issue_datetime = $issue_datetime->text();
        $issue_datetime = str_replace("年", "/", $issue_datetime);
        $issue_datetime = str_replace("月", "/", $issue_datetime);
        $issue_datetime = str_replace("日", " ", $issue_datetime);
        $issue_datetime = str_replace("時", ":00", $issue_datetime);
        $issue_datetime = new \DateTime($issue_datetime);
        $issue_datetime = $issue_datetime->format("Y/m/d H:i");
        return $issue_datetime;
    }
    
    public function getCompanyName($press_info)
    {
        $company_name = $press_info->find("h3")->text();
        $company_name = trim($company_name);
        return $company_name;
    }
    
    public function getPressBody($doc)
    {
        $press_body = $doc->find('.pressrelease_content')->html();
        $press_body = trim($press_body);
        return $press_body;
    }
    
    public function getPressDescription($doc)
    {
        $press_description = $doc->find('meta[property="og:description"]')->attr("content");
        return $press_description;
    }
}
