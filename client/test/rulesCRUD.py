#!/usr/bin/env python

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class rulesCRUDtest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')
        self.driver.maximize_window()

    def ttest_rulesCreate(self):
        fi = open("./results/"+time.strftime("%y-%m-%d",
                                             time.localtime())+"/rulesCRUD.txt", "w+")
        fi.write("Rules CRUD testing:\n")
        fi.close()

        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/rulesCRUD.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        addrules = driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[3]")
        addrules.click()
        time.sleep(1)
        f.write(driver.title + " Page open ok.\n")

        ruleName = driver.find_element_by_name("ruleName")
        ruleTag = driver.find_element_by_name("ruleTag")
        ruleDsc = driver.find_element_by_name("ruleDsc")

        addCon = driver.find_element_by_name("addCon")
        rmvCon = driver.find_element_by_name("rmvCon")
        paraA = driver.find_elements_by_name("Input__InputElement__3TB0k")
        compair = driver.find_elements_by_name("compair")
        paraValue = driver.find_elements_by_name("paraValue")

        addAct = driver.find_element_by_name("addAct")
        rmvAct = driver.find_element_by_name("rmvAct")
        actA = driver.find_elements_by_name("actA")

        addRule = driver.find_element_by_name("addRule")

        ruleName.send_keys("test rule")
        ruleTag.send_keys("test")
        ruleDsc.send_keys("testtest")

        addCon.click()
        addCon.click()
        rmvCon.click()
        rmvCon.click()
        addCon.click()
        addAct.click()
        time.sleep(2)
        addAct.click()
        rmvAct.click()
        rmvAct.click()
        addAct.click()
        time.sleep(5)

        for i in paraA:
            i.find_element_by_xpath("//options[@value='para-b']").click()
            i.next.find_element_by_xpath("//options[@value='para-c']").click()
            break
        for i in compair:
            i.find_element_by_xpath("//options[@value='larger']").click()
            i.next.find_element_by_xpath("//options[@value='smaller']").click()
            break
        for i in paraValue:
            i.send_keys("30")
            i.next.send_keys("50")
        for i in actA:
            i.find_element_by_xpath("//options[@value='2']")
            i.next.find_element_by_xpath("//options[@value='3']")
            break

        time.sleep(10)
        addRule.click()

    def ttest_rulesUpdate(self):
        fi = open("./results/"+time.strftime("%y-%m-%d",
                                             time.localtime())+"/rulesCRUD.txt", "w+")
        fi.write("Rules CRUD testing:\n")
        fi.close()

        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/rulesCRUD.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[2]").click()
        detials = driver.find_elements_by_name("rulesDetails")
        for i in detials:
            i.click()
            break
        time.sleep(1)
        f.write(driver.title + " Page open ok.\n")

        editbtn = driver.find_element_by_name("editbtn")
        editbtn.click()
        time.sleep(5)
        f.write("Edit page open ok.\n")
        f.close()

    def test_rulesDelete(self):
        fi = open("./results/"+time.strftime("%y-%m-%d",
                                             time.localtime())+"/rulesCRUD.txt", "w+")
        fi.write("Rules CRUD testing:\n")
        fi.close()

        f = open("./results/"+time.strftime("%y-%m-%d",
                                            time.localtime())+"/rulesCRUD.txt", "a+")
        driver = self.driver
        driver.get('localhost:3000')
        # wdashboard = driver.find_element_by_name('wdashborad')
        # wdashboard.click()
        driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[2]").click()
        detials = driver.find_elements_by_name("rulesDetails")
        for i in detials:
            i.click()
            break
        time.sleep(1)
        f.write(driver.title + " Page open ok.\n")
        time.sleep(5)

        ruleTitle = driver.find_element_by_name("ruleTitle").text
        print(ruleTitle)
        deletebtn = driver.find_element_by_name("dltbtn")
        deletebtn.click()
        time.sleep(5)

        driver.find_element_by_xpath(
            "//ul[@id='sidebar']/li[2]").click()
        details = driver.find_elements_by_name("rulesDetails")
        for i in details:
            i.click()
            break
        newruleTitle = driver.find_element_by_name("ruleTitle").text

        if newruleTitle in ruleTitle:
            f.write("rules deletion ok.\n")
        else:
            f.write("sth's wrong dude (lost ethusiastic)")

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
