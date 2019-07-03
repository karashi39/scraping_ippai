<?php
namespace TestCase\Scraping;

class PrTimesTest extends \Test\PressScrapingBase
{
    protected $type = "pr-times";
    protected $test_url_for_max_page_number = self::HTML_DIR . "/pr-times_search_result.html";
    protected $test_url_for_press_info = self::HTML_DIR . "/pr-times_search_result.html";
    protected $test_url_for_press_detail = self::HTML_DIR . "/pr-times_search_result.html";
    protected $test_url_for_each_press = self::HTML_DIR . "/pr-times_press_page.html";
    
    public function setTestData()
    {
        //for scrapeMaxPageNumber() normal test.
        $this->max_page_number_expected = 1;
        
        //for scrapePressInfo() normal test.
        $this->press_info_array_length_expected = 100;
        
        //for scrapePressDetail() normal test.
        $this->press_description_expected = "フレセッツ株式会社のプレスリリース（2019年5月16日 14時22分）フレセッツ、技術顧問に今井崇也氏が就任";
        $this->press_body_expected = file_get_contents(self::EXPECTED_DIR . "/pr-times_press_body.html");
        $expected  = [
            'introducer' => "pr-times",
            'press_title' => "建設テック、不動産テックのZWEISPACE、オーストラリア、カナダに続き、地震多発地域のアジア各国へ進出を決定。"
                . "耐震ブロックチェーン特許に加え、不動産チェーンの記録検索サイトも構築",
            'press_page_url' => "https://prtimes.jp/main/html/rd/p/000000028.000029068.html",
            'issue_datetime' => "2019/05/17 18:04",
            'company_name' => "株式会社ZWEISPACE JAPAN",
            'press_body' => "",
            'press_description' => ""
        ];
        $this->press_detail_expected = $expected;
    }
}
