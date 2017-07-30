import media
import fresh_tomatoes


def main():
    # instantiate movie objects
    american_beauty = media.Movie(
        "American Beauty",
        "https://upload.wikimedia.org/wikipedia/en/b/b6/American_Beauty_poster.jpg",
        "https://youtu.be/3ycmmJ6rxA8")
    arrival = media.Movie(
        "Arrival",
        "https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg",
        "https://youtu.be/tFMo3UJ4B4g")
    interstellar = media.Movie(
        "Interstellar",
        "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        "https://youtu.be/zSWdZVtXT7E")
    # create a list of movies
    movies = [american_beauty, arrival, interstellar]
    # build the HTML file
    fresh_tomatoes.open_movies_page(movies)


if __name__ == '__main__':
    main()

