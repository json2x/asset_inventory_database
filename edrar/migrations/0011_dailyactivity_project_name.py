# Generated by Django 3.2.5 on 2021-11-04 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edrar', '0010_auto_20210929_1544'),
    ]

    operations = [
        migrations.AddField(
            model_name='dailyactivity',
            name='project_name',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
