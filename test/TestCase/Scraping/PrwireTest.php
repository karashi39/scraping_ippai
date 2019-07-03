<?php
namespace TestCase\Scraping;

class PrwireTest extends \Test\PressScrapingBase
{
    protected $type = "prwire";
    protected $test_url_for_max_page_number = self::HTML_DIR . "/prwire_search_result.html";
    protected $test_url_for_press_info = self::HTML_DIR . "/prwire_search_result.html";
    protected $test_url_for_press_detail = self::HTML_DIR . "/prwire_search_result.html";
    protected $test_url_for_each_press = self::HTML_DIR . "/prwire_press_page.html";
    
    public function setTestData()
    {
        //for scrapeMaxPageNumber() normal test.
        $this->max_page_number_expected = 1;
        
        //for scrapePressInfo() normal test.
        $this->press_info_array_length_expected = 25;
        
        //for scrapePressDetail() normal test.
        $this->press_description_expected = "ブロックチェーンゲーム「CRYPTONINJA」を展開するエバーシステム株式会社"
            .  "（名古屋市金山1丁目15-14-301　代表取締役　石田陽之）がブロックチェーンネットワークを開発するFLETA（マルタ共和国）との間で共同開発に関する覚書に調印、"
            . "今後FLETAを活用した分散型アプリケーション（DApps）の開発を積極的に行う。";
        $this->press_body_expected = file_get_contents(self::EXPECTED_DIR . "/prwire_press_body.html");
        $expected  = [
            'introducer' => "prwire",
            'press_title' => "ブロックチェーン開発企業のエバーシステムが、FLETA（マルタ共和国）との間で共同開発の覚書に調印",
            'press_page_url' => "https://kyodonewsprwire.jp/release/201809017458",
            'issue_datetime' => "2018/09/03 00:00",
            'company_name' => "エバーシステム",
            'press_body' => "",
            'press_description' => ""
        ];
        $this->press_detail_expected = $expected;
    }
}
