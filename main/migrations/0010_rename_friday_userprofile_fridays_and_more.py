# Generated by Django 4.0.4 on 2022-06-20 13:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_remove_userprofile_friday_userprofile_friday_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='friday',
            new_name='fridays',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='saturday',
            new_name='saturdays',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='sunday',
            new_name='sundays',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='thursday',
            new_name='thursdays',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='wedensday',
            new_name='wedensdays',
        ),
    ]
