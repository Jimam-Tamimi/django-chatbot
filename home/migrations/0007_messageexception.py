# Generated by Django 3.2.5 on 2021-07-16 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_data_index'),
    ]

    operations = [
        migrations.CreateModel(
            name='MessageException',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=200, verbose_name='Exception Message')),
            ],
        ),
    ]
