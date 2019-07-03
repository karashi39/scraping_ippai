<?php
namespace TestCase\Scraping;

class AtpressTest extends \Test\PressScrapingBase
{
    protected $type = "atpress";
    protected $test_url_for_max_page_number = self::HTML_DIR . "/atpress_search_result.html";
    protected $test_url_for_press_info = self::HTML_DIR . "/atpress_search_result.html";
    protected $test_url_for_press_detail = self::HTML_DIR . "/atpress_search_result.html";
    protected $test_url_for_each_press = self::HTML_DIR . "/atpress_press_page.html";
    
    public function setTestData()
    {
        //for scrapeMaxPageNumber() normal test.
        $this->max_page_number_expected = 1;
        
        //for scrapePressInfo() normal test.
        $this->press_info_array_length_expected = 20;
        
        //for scrapePressDetail() normal test.
        $this->press_description_expected = "株式会社グラコネ(本社：東京都渋谷区、代表取締役：藤本 真衣)と"
            . "株式会社withB(本社：東京都渋谷区、代表取締役：山根 健太)が2019年5月25日に開催する第4回《仮想通貨・ブロックチェーン企業限…";
        $this->press_body_expected = file_get_contents(self::EXPECTED_DIR . "/atpress_press_body.html");
        $expected  = [
            'introducer' => "atpress",
            'press_title' => "全登壇者決定！元マウントゴックス社マルク氏も　 日本最大の仮想通貨・ブロックチェーン業界向け転職フェア",
            'press_page_url' => "https://www.atpress.ne.jp/news/184329",
            'issue_datetime' => "2019/05/21 18:00",
            'company_name' => "株式会社Gracone、株式会社withB",
            'press_body' => "",
            'press_description' => ""
        ];
        $this->press_detail_expected = $expected;
    }
}
