# Generated by Django 4.2.5 on 2023-11-06 09:36

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0002_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="description",
            old_name="en_description",
            new_name="EN",
        ),
        migrations.RenameField(
            model_name="description",
            old_name="ua_description",
            new_name="UA",
        ),
    ]