# Generated by Django 3.2.5 on 2021-09-29 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edrar', '0009_auto_20210831_1203'),
    ]

    operations = [
        migrations.AddField(
            model_name='dailyactivity',
            name='abis',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='dailyactivity',
            name='iubip',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
