import time

from celery import shared_task


@shared_task
def create_task(task_type: str) -> bool:
    time.sleep(20)
    print("TASK: ", task_type)
    return True
