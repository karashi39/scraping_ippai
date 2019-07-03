<?php
namespace TestCase\Scraping;

class URLGeneratorTest extends \PHPUnit\Framework\TestCase
{
    public function setUp()
    {
        require_once __DIR__ . '/../../../config.php';
    }
    
    public function testGenPressURLList()
    {
        //normal case.
        $search_condition_list = [['keyword' => 'ブロックチェーン', 'category' => '9']];
        $url_list = \Scraping\URLGenerator::genPressURLList($search_condition_list);
        
        //outline
        $this->assertArrayHasKey('url', $url_list[0]);
        $this->assertArrayHasKey('type', $url_list[0]);
        $this->assertArrayHasKey('tag', $url_list[0]);
        
        //value
        $this->assertContains('pr-times', array_column($url_list, 'type'));
        $this->assertContains('atpress', array_column($url_list, 'type'));
        $this->assertContains('prwire', array_column($url_list, 'type'));
        $this->assertContains('news2u', array_column($url_list, 'type'));
        //$this->assertContains('dreamnews', array_column($url_list, 'type'));
        $this->assertContains('value-press', array_column($url_list, 'type'));
        
        //all url are accessible
        foreach ($url_list as $url) {
            $ret = file_get_contents($url["url"]);
        }
        $this->assertNotNull($ret);
        
        //if keyword invalid
        $search_condition_list = null;
        $url_list = \Scraping\URLGenerator::genPressURLList($search_condition_list);
        $this->assertNull($url_list);
    }
}
