<?php
namespace Scraping;

class URLGenerator
{
    public static function genPressURLList($search_condition_list)
    {
        if (is_null($search_condition_list)) {
            return null;
        }
        
        $target_site_list = [
            "pr-times",
            "prwire",
            "news2u",
            "atpress",
            //"dreamnews",
            "value-press",
        ];
        
        $target_url_list = [];
        foreach ($search_condition_list as $search_condition) {
            foreach ($target_site_list as $target_site) {
                $target = \Scraping\Util::targetSelector($target_site);
                $urls = $target->genSearchURL($search_condition["keyword"]);
                foreach ($urls as $url) {
                    $target_url_array = [
                        "url" => $url,
                        "tag" => $search_condition["category"],
                        "type" => $target_site,
                        "done" => "false"
                    ];
                    array_push($target_url_list, $target_url_array);
                }
            }
        }
        return $target_url_list;
    }
}
