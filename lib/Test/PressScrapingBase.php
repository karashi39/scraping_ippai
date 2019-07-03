<?php
namespace Test;

class PressScrapingBase extends \PHPUnit\Framework\TestCase
{
    const HTML_DIR = __DIR__ . "/../../test/resource/html";
    const EXPECTED_DIR = __DIR__ . "/../../test/resource/expected";
    protected $type = "type: introducer";
    protected $test_url_for_max_page_number = "test_url_for_max_page_number: implement in child class";
    protected $test_url_for_press_info = "test_url_for_press_info: implement in child class";
    protected $test_url_for_press_detail = "test_url_for_press_detail: implement in child class";
    protected $test_url_for_each_press = "test_url_for_each_press: implement in child class";
    
    public $max_page_number_expected = "(int) max_page_number_expected: implement in setTestData().";
    public $press_info_array_length_expected = "(int) press_info_array_length_expected: implement in setTestData().";
    public $press_detail_expected = "(array) press_detail_expected: implement in setTestData().";
    public $press_body_expected = "(string) press_body_expected: implement in setTestData().";
    public $press_description_expected = "(string) press_description_expected: implement in setTestData().";
    
    public function setUp()
    {
        require __DIR__ . '/../../config.php';
        $this->setTestData();
    }
    
    public static function formatAsserts($press_detail)
    {
        $introducers = ['pr-times', 'atpress', 'prwire', 'news2u', 'dreamnews', 'value-press'];
        self::assertTrue(in_array($press_detail['introducer'], $introducers, true));
        self::assertNotNull($press_detail['press_title']);
        self::assertNotRegExp('/\s/', $press_detail['press_page_url']);
        self::assertNotNull($press_detail['company_name']);
        $reg = '/^([1-9][0-9]{3})\/([1-9]{1}|0[1-9]{1}|1[0-2]{1})\/([1-9]{1}|0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})';
        $reg .= ' ([0-2]{1}[0-9]{1}|[0-9]{1}|0[0-9]{1})\:([0-6]{1}[0-9]{1}|[0-9]{1})$/';
        self::assertRegExp($reg, $press_detail['issue_datetime']);
        self::assertNotNull($press_detail['press_body']);
        self::assertNotNull($press_detail['press_description']);
    }
    
    public function testScrapeMaxPageNumber()
    {
        $target = \Scraping\Util::targetSelector($this->type);
        $max_page_number = $target->scrapeMaxPageNumber($this->test_url_for_max_page_number);
        $this->assertEquals($this->max_page_number_expected, $max_page_number);
    }
    
    public function testScrapePressInfo()
    {
        $target = \Scraping\Util::targetSelector($this->type);
        $press_info_array = $target->scrapePressInfo($this->test_url_for_press_info);
        $this->assertCount($this->press_info_array_length_expected, $press_info_array);
    }
    
    public function testScrapePressDetail()
    {
        $target = \Scraping\Util::targetSelector($this->type);
        $html = file_get_contents($this->test_url_for_press_detail);
        $press_info_array = $target->scrapePressInfo($this->test_url_for_press_detail);
        $press_info = $press_info_array[0];
        $press_detail = $target->scrapePressDetail($press_info);
        $this->formatAsserts($press_detail);
        $press_detail["press_body"] = "";
        $press_detail["press_description"] = "";
        $this->assertEquals($this->press_detail_expected, $press_detail);
    }
    
    public function testScrapePressEach()
    {
        $target = \Scraping\Util::targetSelector($this->type);
        [$press_body, $press_description] = $target->scrapePressEach($this->test_url_for_each_press);
        $this->assertEquals($this->press_description_expected, $press_description);
        $this->assertEquals($this->press_body_expected, $press_body);
    }
}
