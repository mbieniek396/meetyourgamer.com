# Generated by Django 4.0.4 on 2022-06-20 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_remove_userprofile_monday_userprofile_mondays'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='tuesday',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='tuesdays',
            field=models.ManyToManyField(to='main.tuesday'),
        ),
    ]