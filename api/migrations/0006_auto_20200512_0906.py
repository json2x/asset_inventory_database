# Generated by Django 3.0.4 on 2020-05-12 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_apiusertoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiusertoken',
            name='access_token',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='apiusertoken',
            name='refresh_token',
            field=models.CharField(max_length=255),
        ),
    ]