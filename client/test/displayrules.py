#!/usr/bin/env python

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class displayrules(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')
        self.driver.maximize_window()

    def test_details(self):
        fi = open("./results/"+time.strftime("%y-%m-%d",
                                             time.localtime())+"/displayrules.txt", "w+")
        fi.write("Rules display testing:\n")
        fi.close()

        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/displayrules.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        displayrules = driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[2]")
        displayrules.click()
        time.sleep(1)
        f.write(driver.title + " Page open ok.\n")

        resultRules = driver.find_elements_by_name('resultName')
        a = 0
        b = 0
        for i in resultRules:
            a = a+1
            driver.find_element_by_name("rulesDetails").click()
            ruleTitle = driver.find_element_by_name("ruleTitle")
            time.sleep(1)
            if ruleTitle in i.text:
                b = b+1
                driver.find_element_by_name("returnToDisplay").click()
            else:
                driver.find_element_by_name("returnToDisplay").click()
        if b == a:
            f.write("Rule details ok.\n")
        else:
            f.write("RULE DETAILS ARE NOT CORRESPONDED. STH\'S WRONG DUDE!!!!!")

        f.close()

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
