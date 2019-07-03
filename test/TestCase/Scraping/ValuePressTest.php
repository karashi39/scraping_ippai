<?php
namespace TestCase\Scraping;

class ValuePressTest extends \Test\PressScrapingBase
{
    protected $type = "value-press";
    protected $test_url_for_max_page_number = self::HTML_DIR . "/value-press_search_result.html";
    protected $test_url_for_press_info = self::HTML_DIR . "/value-press_search_result.html";
    protected $test_url_for_press_detail = self::HTML_DIR . "/value-press_search_result.html";
    protected $test_url_for_each_press = self::HTML_DIR . "/value-press_press_page.html";
    
    public function setTestData()
    {
        //for scrapeMaxPageNumber() normal test.
        $this->max_page_number_expected = 14;
        
        //for scrapePressInfo() normal test.
        $this->press_info_array_length_expected = 20;
        
        //for scrapePressDetail() normal test.
        $this->press_description_expected = "株式会社GRIのプレスリリース（2019年5月23日 16時）。近年高い注目を集める「ディープラーニング」と「フィンテック」に強みを持つ2社が、"
            . "資本・業務提携を行いました。機械学習およびディープラーニング等の解析技術とフィンテック関連技術を統合することで、新たなサービスの開発に取り組みます。";
        $this->press_body_expected = file_get_contents(self::EXPECTED_DIR . "/value-press_press_body.html");
        $expected  = [
            'introducer' => "value-press",
            'press_title' => "「ディープラーニング」によるデータ解析を手掛けるGRIが、フィンテック領域でのサービス開発強化に向け、"
                . "キャッシュレスサービスを提供するSTAGEと資本・業務提携",
            'press_page_url' => "https://www.value-press.com/pressrelease/221584",
            'issue_datetime' => "2019/05/23 16:00",
            'company_name' => "株式会社GRI",
            'press_body' => "",
            'press_description' => ""
        ];
        $this->press_detail_expected = $expected;
    }
}
