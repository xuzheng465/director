#!/usr/bin/env python

import unittest
from general import generalTests
from searchRules import searchTests
from displayrules import displayrules

if __name__ == '__main__':
    suite = unittest.TestSuite()

    generalTests = [generalTests("test_welcome"), generalTests("test_navbar")]
    searchTests = [searchTests("test_SearchonDashboard"), searchTests(
        "test_SearchonRulesDisplay"), searchTests("test_SearchonAddRules"), searchTests("test_SearchonSearchResults")]
    displayTests = [displayrules("test_details")]
    suite.addTests(generalTests)
    suite.addTests(searchTests)
    suite.addTest(displayrules)

    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
