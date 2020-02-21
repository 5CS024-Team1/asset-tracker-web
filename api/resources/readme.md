# How to Import/Export Current Database Data

Make sure you've downloaded and installed [XAMPP](https://www.apachefriends.org/index.html). Then open `xampp-control.exe` and start up the Apache and MySQL modules. Navigate to [localhost:8080/phpmyadmin/](http://localhost:8080/phpmyadmin/) to access the admin page.

## Import

Create a blank database called `assets_db`. Navigate to the Import tab in that database. Click "Choose File" button and navigate to `assets.sql` to load the current table and data into the new database

## Export

Navigate to the `Export` tab inside the `assets_db` database. Choose `Quick` as the Export Method and set the Format to `SQL`. Click "Go" and replace the existing `assets.sql` inside this folder with the new one