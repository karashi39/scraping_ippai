<?php
namespace Scraping;

class Util
{
    public static function targetSelector($type)
    {
        if ($type == "connpass") {
            $target = new \Scraping\Connpass();
        } elseif ($type == "doorkeeper") {
            $target = new \Scraping\Doorkeeper();
        } elseif ($type == "atnd") {
            $target = new \Scraping\ATND();
        } elseif ($type == "street-academy") {
            $target = new \Scraping\StreetAcademy();
        } elseif ($type == "peatix") {
            $target = new \Scraping\Peatix();
        } elseif ($type == "pr-times") {
            $target = new \Scraping\PrTimes();
        } elseif ($type == "atpress") {
            $target = new \Scraping\Atpress();
        } elseif ($type == "prwire") {
            $target = new \Scraping\Prwire();
        } elseif ($type == "news2u") {
            $target = new \Scraping\News2u();
        } elseif ($type == "dreamnews") {
            $target = new \Scraping\Dreamnews();
        } elseif ($type == "value-press") {
            $target = new \Scraping\ValuePress();
        }
        return $target;
    }
}
