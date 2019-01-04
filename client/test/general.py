#!/usr/bin/env python

import time
import unittest
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class generalTests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')
        self.driver.maximize_window()

    def test_welcome(self):
        fi = open("./results/"+time.strftime("%y-%m-%d",
                                             time.localtime())+"/welcome.txt", "w+")
        fi.write("Welcome page testing:\n")
        fi.close()

        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/welcome.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        time.sleep(2)
        f.write(driver.title + " Page open ok.\n")

        wdashboard = driver.find_element_by_name('wdashborad')
        wdashboard.click()
        f.write("Welcome page go to dashboard ok.")
        time.sleep(3)

    def test_navbar(self):
        fi = open("./results/"+time.strftime("%y-%m-%d",
                                             time.localtime())+"/navbar.txt", "w+")
        fi.write("Navbar testing:\n")
        fi.close()

        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/navbar.txt", "a+")

        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        f.write(driver.title + " Page open ok.\n")

        displayrules = driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[2]")
        displayrules.click()
        time.sleep(5)
        f.write("\tdisplayrules ok\n")

        logo = driver.find_element_by_name('logo')
        logo.click()
        time.sleep(2)
        f.write("\tlogo ok\n")

        addrules = driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[3]")
        addrules.click()
        time.sleep(5)
        f.write("\taddrules ok\n")

        dashboard = driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[1]")
        dashboard.click()
        time.sleep(5)
        f.write("\tdisplayrules ok\n")

        f.close()

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
