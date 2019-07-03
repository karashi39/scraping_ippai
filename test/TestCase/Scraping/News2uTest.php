<?php
namespace TestCase\Scraping;

class News2uTest extends \Test\PressScrapingBase
{
    protected $type = "news2u";
    protected $test_url_for_max_page_number = self::HTML_DIR . "/news2u_search_result.html";
    protected $test_url_for_press_info = self::HTML_DIR . "/news2u_search_result.html";
    protected $test_url_for_press_detail = self::HTML_DIR . "/news2u_search_result.html";
    protected $test_url_for_each_press = self::HTML_DIR . "/news2u_press_page.html";
    
    public function setTestData()
    {
        //for scrapeMaxPageNumber() normal test.
        $this->max_page_number_expected = 5;
        
        //for scrapePressInfo() normal test.
        $this->press_info_array_length_expected = 20;
        
        //for scrapePressDetail() normal test.
        $this->press_description_expected = "株式会社ジャパンタイムズのニュースリリース（2019年05月08日）ジャパンタイムズ先端技術フォーラムを5月31日に開催（入場無料）"
            . "～ブロックチェーンと深層学習（ディープラーニング）がもたらす未来";
        $this->press_body_expected = file_get_contents(self::EXPECTED_DIR . "/news2u_press_body.html");
        $expected  = [
            'introducer' => "news2u",
            'press_title' => "ジャパンタイムズ先端技術フォーラムを5月31日に開催（入場無料） ～ブロックチェーンと深層学習（ディープラーニング）がもたらす未来",
            'press_page_url' => "https://www.news2u.net/releases/165646",
            'issue_datetime' => "2019/05/08 11:00",
            'company_name' => "株式会社ジャパンタイムズ",
            'press_body' => "",
            'press_description' => ""
        ];
        $this->press_detail_expected = $expected;
    }
}
