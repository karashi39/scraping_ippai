<?php
namespace Base;

interface PressScrapingInterface
{
    //To Be Implemented In Abstract Class.
    public function scrapeMaxPageNumber($url);
    public function scrapePressInfo($url);
    public function scrapePressDetail($press_info);
    public function scrapePressEach($url);
    public function getHTML($url);
    
    //To Be Implemented In Child Class.
    public function getMaxPageNumber($doc);
    public function getPressInfoList($doc);
    public function getPressTitle($press_info);
    public function getPressPageURL($press_info);
    public function getIssueDatetime($press_info);
    public function getCompanyName($press_info);
    public function getPressBody($press_info);
    public function getPressDescription($doc);
    
    public function genSearchURL($search_keyword);
}
