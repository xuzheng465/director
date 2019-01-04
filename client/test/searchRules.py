#!/usr/bin/env python

import time
import unittest
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class searchTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')
        self.driver.maximize_window()

    def test_SearchonDashboard(self):
        fi = open("./results/"+time.strftime("%y-%m-%d",
                                             time.localtime())+"/searchrules.txt", "w+")
        fi.write("Rules searching testing:\n")
        fi.close()

        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/searchrules.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        f.write(driver.title + " Page open ok.\n")

        searchbox = driver.find_element_by_name('searchRule')
        searchbox.send_keys('pagination'+Keys.RETURN)
        resultRule = driver.find_elements_by_name('resultName')
        a = 0
        b = 0
        for i in resultRule:
            a = a+1
            if "pagination" in i.text:
                b = b+1
        if b == a:
            f.write("search rule on dashboard ok.\n")
        else:
            f.write("SEARCH ON DASHBOARD FAILED. STH\'S WRONG DUDE!!!!!")

        time.sleep(5)

    def test_SearchonRulesDisplay(self):
        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/searchrules.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        displayrules = driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[2]")
        displayrules.click()
        f.write(driver.title + " Page open ok.\n")

        searchbox = driver.find_element_by_name('searchRule')
        searchbox.send_keys('pagination'+Keys.RETURN)
        resultRule = driver.find_elements_by_name('resultName')
        a = 0
        b = 0
        for i in resultRule:
            a = a+1
            if "pagination" in i.text:
                b = b+1
        if b == a:
            f.write("search rule on display ok.\n")
        else:
            f.write("SEARCH ON RULES DISPLAY FAILED. STH\'S WRONG DUDE!!!!!")

        time.sleep(5)

    def test_SearchonAddRules(self):
        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/searchrules.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        addrules = driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[3]")
        addrules.click()
        f.write(driver.title + " Page open ok.\n")

        searchbox = driver.find_element_by_name('searchRule')
        searchbox.send_keys('pagination'+Keys.RETURN)
        resultRule = driver.find_elements_by_name('resultName')
        a = 0
        b = 0
        for i in resultRule:
            a = a+1
            if "pagination" in i.text:
                b = b+1
        if b == a:
            f.write("search rule on add rules ok.\n")
        else:
            f.write("SEARCH ON ADD RULES FAILED. STH\'S WRONG DUDE!!!!!")

        time.sleep(5)

    def test_SearchonSearchResults(self):
        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/searchrules.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        f.write(driver.title + " Page open ok.\n")

        searchbox = driver.find_element_by_name('searchRule')
        searchbox.send_keys('water'+Keys.RETURN)
        searchbox.send_keys('pagination'+Keys.RETURN)
        resultRule = driver.find_elements_by_name('resultName')
        a = 0
        b = 0
        for i in resultRule:
            a = a+1
            if "pagination" in i.text:
                b = b+1
        if b == a:
            f.write("search rule on result page ok.\n")
        else:
            f.write("SEARCH ON RESULT PAGE FAILED. STH\'S WRONG DUDE!!!!!")

        time.sleep(5)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
