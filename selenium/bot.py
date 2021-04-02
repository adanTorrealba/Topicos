
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time

driver = webdriver.Edge(r'J:\\proyecto-topicos\\selenium\\msedgedriver.exe')

driver.maximize_window()
driver.get('http://localhost:3000')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#nombre-form')))\
    .send_keys('Soy un bot')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#tlf-form')))\
    .send_keys('04125555555')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#email-form')))\
    .send_keys('bot@gmail.com')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#password-form')))\
    .send_keys('123456')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#password-confirm-form')))\
    .send_keys('123456')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'button#boton-register')))\
    .click()

WebDriverWait(driver, 20)\
    .until(EC.element_to_be_clickable((By.XPATH,
                                      '/html/body/div/div/nav[1]/a')))\
    .click()

WebDriverWait(driver, 20)\
    .until(EC.element_to_be_clickable((By.XPATH,
                                      '/html/body/div/div/nav[1]/div/a[3]')))\
    .click()

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#nombre-contacto')))\
    .send_keys('Bot')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#email-contacto')))\
    .send_keys('bot@gmail.com')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'input#tlf-contacto')))\
    .send_keys('04125555555')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'textarea#mensaje-contacto')))\
    .send_keys('Este es un mensaje escrito por el bot.')

WebDriverWait(driver, 10)\
    .until(EC.element_to_be_clickable((By.CSS_SELECTOR,
                                      'button#enviar-mensaje')))\
    .click()
