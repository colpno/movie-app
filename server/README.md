<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Movies</h3>

  <p align="center">
    <br />
    <a href="https://github.com/colpno/movie-app/tree/master/docs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/colpno/movie-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/colpno/movie-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
        <li><a href="#which-features-this-project-deal-with">Which features this project deal with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Built With

- [![PHP][php-badge]][php-url]
- [![Laravel][laravel-badge]][laravel-url]
- [![MySQL][mysql-badge]][mysql-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Which features this project deal with

- How to create and use [Controllers](https://laravel.com/docs/10.x/controllers).
- How to create and use [Factory](https://laravel.com/docs/10.x/eloquent-factories)
- How to create and use [Migration](https://laravel.com/docs/10.x/migrations)
- How to create and use [Seeding](https://laravel.com/docs/10.x/seeding)
- How to create [Routes](https://laravel.com/docs/10.x/routing)
- How to protect routes with [Sanctum](https://laravel.com/docs/10.x/sanctum)
- How to integrate MySQL in Laravel
- How to implement REST API in Laravel
- How to authorize the requests with token in Laravel
- How to implement [Rate Limiting](https://laravel.com/docs/10.x/routing#rate-limiting)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- npm
- Laravel
- MySQL
- An empty MySQL database

### Installation

1. Clone the repository.

```sh
git clone https://github.com/colpno/movie-app.git
```

2. Install dependencies.

```sh
cd movie-app/server
composer install
npm install
```

3. Create .env file

```sh
cp .env.example .env
```

4. Generate an app encryption key and fill the `APP_KEY` in .env file with the generated key

```sh
php artisan key:generate
```

5. Fill in the `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` in .env file to match the credentials of the created database 

6. Migrate the database

```sh
php artisan migrate
```

7. Seed the database

```sh
php artisan db:seed
```

>To start the server, run:

```sh
php artisan serve
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Tạ Gia Vinh - gvinhh@gmail.com

- [![LinkedIn][linkedin-shield]][linkedin-url]
- [![Facebook][Facebook-shield]][Facebook-url]

Project Link: [https://github.com/colpno/movie-app](https://github.com/colpno/movie-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[php-url]: https://www.php.net/
[php-badge]: https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=FFFFFF
[laravel-url]: https://laravel.com/
[laravel-badge]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=FFFFFF
[mysql-url]: https://www.mysql.com/
[mysql-badge]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=FFFFFF

[Facebook-shield]: https://img.shields.io/badge/Facebook-0866FF?style=for-the-badge&logo=facebook&logoColor=FFFFFF
[Facebook-url]: https://www.facebook.com/profile.php?id=100005408149001
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=FFFFFF
[linkedin-url]: https://www.linkedin.com/in/gia-vinh-t%E1%BA%A1-a2224b2a8
