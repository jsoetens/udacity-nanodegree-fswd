#!/usr/bin/env python3

import psycopg2


class LogAnalyzer(object):

    """
    This class connects to a PostgreSQL database called news and provides
    reporting on the site's articles. It does that by answering some questions.
    """
    def __init__(self, dbname):
        self.dbname = dbname
        # get a Connection object
        self._db_connection = psycopg2.connect("dbname=" + self.dbname)
        # make a Cursor object from a connection
        self._db_cur = self._db_connection.cursor()

    def query(self, query):
        # run and return a statement
        return self._db_cur.execute(query)

    def get_popular_articles(self, limit):
        """
        What are the most popular three articles of all time?
        Example: "Princess Shellfish Marries Prince Handsome" — 1201 views
        Requires view v_log_articles.
        """
        query = """
            select article_title, total_views
            from v_log_articles
            order by total_views desc
            limit {0};
        """.format(limit)
        print("These are the {0} most popular articles of \
            all time:\n".format(limit))
        self.query(query)
        for record in self._db_cur:
            print("\"{0}\" - {1} views".format(record[0], record[1]))

    def get_popular_authors(self):
        """
        Who are the most popular article authors of all time?
        Example: Ursula La Multa — 2304 views
        Requires view v_log_articles.
        """
        query = """
            select author_name, sum(total_views) as total_views
            from v_log_articles
            group by author_name
            order by total_views desc;
        """
        self.query(query)
        print("\nThese are the most popular article authors of all time:\n")
        for record in self._db_cur:
            print("{0} - {1} views".format(record[0], record[1]))

    def get_days_with_errors(self, percentage):
        """
        On which days did more than 1% of requests lead to errors?
        Example: July 29, 2016 — 2.5% errors
        Requires view v_log_errors.
        """
        query = """
            select to_char(log_date, 'Mon DD, YYYY'), percentage
            from v_log_errors
            where percentage > {0}
            order by log_date desc;
        """.format(percentage)
        self.query(query)
        print("\nThese days had more than 1% of requests with errors:\n")
        for record in self._db_cur:
            print("{0} - {1}% errors".format(record[0], record[1]))

    def __del__(self):
        """
        Destructor: called when the instance is about to be destroyed.
        Closes the the connection
        """
        self._db_connection.close()


def main():
    report = LogAnalyzer('news')
    report.get_popular_articles(3)
    report.get_popular_authors()
    report.get_days_with_errors(1)

if __name__ == '__main__':
    main()
