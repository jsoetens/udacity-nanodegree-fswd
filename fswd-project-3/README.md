# FSWD Project 3 - Logs Analysis

## Goal of the Project
Build an internal reporting tool in Python that will use information from a PostgreSQL database to discover what kind of articles the site's readers like.

## Prerequisites
This project makes use of a Linux-based VM, you'll need [Vagrant](https://www.vagrantup.com) and [VirtualBox](https://www.virtualbox.org). Fork or clone the repository to get the [VM configuration](https://github.com/udacity/fullstack-nanodegree-vm).
The database setup and data can be found in [newsdata.sql](https://d17h27t6h515a5.cloudfront.net/topher/2016/August/57b5f748_newsdata/newsdata.zip).

## Getting Started
Copy **logs_analysis.py** and **newsdata.sql** to the vagrant folder of your Vagrant VM.

```Shell
cp ~/logs_analysis.py ~/fullstack-nanodegree-vm/vagrant
cp ~/newsdata.sql ~/fullstack-nanodegree-vm/vagrant
```

Start your Vagrant VM and log in.

```Shell
cd ~/fullstack-nanodegree-vm/vagrant
vagrant up
vagrant ssh
```

Load the data in the local PostgreSQL database

```Shell
cd /vagrant
psql -d news -f newsdata.sql
```

## The News Database
The database in **newsdata.sql** includes three tables:
* The authors table includes information about the authors of articles.
* The articles table includes the articles themselves.
* The log table includes one entry for each time a user has accessed the site.

## Create Views
Connect to the **news** database with **psql** and create views **v_log_articles** and **v_log_errors**.

```Shell
psql -d news
````

```SQL
create or replace view v_log_articles as
select a.name as author_name, art.title as article_title, iv.total_views
from authors a
join articles art
on a.id = art.author
join (
	select replace(path, '/article/', '') as article_slug, count(*) as total_views
	from log l
	where l.status = '200 OK'
	group by article_slug
	) iv
on art.slug = iv.article_slug
order by iv.total_views desc;
```

```SQL
create or replace view v_log_errors as
select date(time) as log_date,
	round(
		sum(
			case
				when status = '404 NOT FOUND' then 1
				else 0
			end)
		/
		sum(sum(
			case
				when status = '200 OK'
				then 1
				else 0
			end))
		over (partition by date(time)) * 100, 2) as percentage
from log
group by log_date;
```

## Run the Python Script
```Shell
cd /vagrant
python3 logs_analysis.py
```

## Example Output
```Shell
vagrant@vagrant:/vagrant$ python3 logs_analysis.py
These are the 3 most popular articles of all time:

"Candidate is jerk, alleges rival" - 338647 views
"Bears love berries, alleges bear" - 253801 views
"Bad things gone, say good people" - 170098 views

These are the most popular article authors of all time:

Ursula La Multa - 507594 views
Rudolf von Treppenwitz - 423457 views
Anonymous Contributor - 170098 views
Markoff Chaney - 84557 views

These days had more than 1% of requests with errors:

Jul 17, 2016 - 2.32% errors
```

## Official Style Guide
This code adheres to the [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html).

## Where can I learn more?
Follow the awesome [Udacity Full Stack Web Developer Nanodegree](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004)!
