# Generated by Django 3.2.5 on 2021-07-15 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_auto_20210715_1307'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(default='blank', max_length=500, verbose_name='Message')),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reply', models.CharField(default='blank', max_length=500, verbose_name='Reply')),
            ],
        ),
        migrations.RemoveField(
            model_name='data',
            name='answer',
        ),
        migrations.RemoveField(
            model_name='data',
            name='question',
        ),
        migrations.DeleteModel(
            name='Answer',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.AddField(
            model_name='data',
            name='message',
            field=models.ManyToManyField(to='home.Message'),
        ),
        migrations.AddField(
            model_name='data',
            name='reply',
            field=models.ManyToManyField(to='home.Reply'),
        ),
    ]
