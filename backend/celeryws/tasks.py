import random
import time

import requests
from bs4 import BeautifulSoup
from celery import shared_task
from selenium.webdriver import Chrome, ChromeOptions
from selenium.webdriver.common.by import By

from .models import Game


@shared_task
def create_task(task_type: str) -> bool:
    time.sleep(20)
    print("TASK: ", task_type)
    return True


def config_driver() -> Chrome:
    chrome_options = ChromeOptions()
    # agent = get_random_agent(agents)
    # chrome_options.add_argument(f"--user-agent={agent}")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("log-level=3")
    driver = Chrome(options=chrome_options)
    driver.set_page_load_timeout(30)

    return driver


urls = [
    "https://zegin.com.mk/mk/jm-solution-heartleaf-pena-za-dlabinsko-chistene-na-kozhata-150-ml",
    "https://zegin.com.mk/mk/coxir-vita-c-bright-krem-so-vitmin-c-za-osvetluvane-na-kozhata-50-ml",
    "https://zegin.com.mk/mk/gerovital-h3-evolution-dnevna-regenerativna-lifting-krem-so-spf10-30-50-ml",
]


@shared_task
def scrape_game(game_id: str) -> bool:

    url = random.choice(urls)
    first_team_selector = "#block-zegin-content > div > section > div > div > div.col-12.col-lg-8.mb-5.mb-lg-0.layout--content > div > div.product__summary > div.product__content > div:nth-child(1) > div.product__title.h3 > div"
    second_team_selector = "#block-zegin-content > div > section > div > div > div.col-12.col-lg-8.mb-5.mb-lg-0.layout--content > div > div.product__summary > div.product__content > div:nth-child(1) > div.product__price > div > div"
    start_selector = "#block-zegin-content > div > section > div > div > div.col-12.col-lg-8.mb-5.mb-lg-0.layout--content > div > div.product__summary > div.product__content > div:nth-child(1) > div.product__sku > div > div.field__item"
    league_selector = "#block-zegin-content > div > section > div > div > div.col-12.col-lg-8.mb-5.mb-lg-0.layout--content > div > div.product__summary > div.product__content > div:nth-child(1) > div:nth-child(5) > div > div.field__items > div > a"

    html = requests.get(url).text

    driver = BeautifulSoup(html, "html.parser")

    first_team = driver.select_one(first_team_selector).text[:50]
    second_team = driver.select_one(second_team_selector).text[:50]
    start = driver.select_one(start_selector).text[:50]
    league_name = driver.select_one(league_selector).text[:50]

    Game.objects.create(
        game_id=game_id,
        first_team=first_team,
        second_team=second_team,
        start=start,
        league_name=league_name,
    )

    time.sleep(2)

    return True
