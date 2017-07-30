class Movie(object):

    """
    This class creates a data structure to store information about movies,
    including movie title, movie poster url and a YouTube url to the
    trailer.
    """
    def __init__(self, title, poster_image_url, trailer_youtube_url):
        self.title = title
        self.poster_image_url = poster_image_url
        self.trailer_youtube_url = trailer_youtube_url
