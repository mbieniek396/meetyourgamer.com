# Generated by Django 4.0.4 on 2022-06-18 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_userprofile_friday_alter_userprofile_monday_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='monday',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='mondays',
            field=models.ManyToManyField(to='main.monday'),
        ),
    ]