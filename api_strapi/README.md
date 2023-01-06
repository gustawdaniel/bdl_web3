To register user

```bash
echo '{"username": "user@ok.com", "email": "user@ok.com", "password": "pass"}' | http POST http://localhost:1337/api/auth/local/register
```

To login

```bash
echo '{"identifier": "user@ok.com", "password": "pass"}' | http POST http://localhost:1337/api/auth/local
```

OTP send email

```
POST /api/auth/otp

{
	"email": "gustaw.daniel@gmail.com"
}
```

OTP check code

```
GET /api/auth/otp?confirmation=7503
```

response is

```json
{
	"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY5NzQ0Mjg0LCJleHAiOjE2NzIzMzYyODR9.D2WyZ_pIqUyDxefqDURURtW4ZuKJC5VtUZqDskisNQA",
	"user": {
		"id": 4,
		"username": "gustaw.daniel@gmail.com",
		"email": "gustaw.daniel@gmail.com",
		"provider": "local",
		"confirmed": true,
		"blocked": false,
		"createdAt": "2022-11-29T16:01:42.671Z",
		"updatedAt": "2022-11-29T17:38:44.648Z"
	}
}
```

---

To list recipes

```bash
http GET http://localhost:1337/api/recipes
```

To get single recipe

```bash
http GET "http://localhost:1337/api/recipes/1?populate=*"
```

To create meal with name and connected with recipe

```bash
echo '{
	"data": {
		"name": "First pizza",
		"recipe": 1
	}
}' |  \
  http POST http://localhost:1337/api/meals \
  Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5MTQ4MzY4LCJleHAiOjE2NzE3NDAzNjh9.DadqOHD_p8norp0-PZjjQPLNrJs7C3XofmHbfdRVqDc' \
  Content-Type:application/json
```

To upload image

```bash
echo '-----011000010111000001101001
Content-Disposition: form-data; name="files"; filename="autumn_forest_park_128379_1280x720.jpg"
Content-Type: image/jpeg


-----011000010111000001101001--
' |  \
  http POST http://localhost:1337/api/upload/ \
  Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5MTQ5MTk2LCJleHAiOjE2NzE3NDExOTZ9.RcbnPV8ZBY-Kba9l4HfDnGRyiIsLv4xcZr2FEW1x2to' \
  Content-Type:'multipart/form-data; boundary=---011000010111000001101001'
```

axios

```javascript
import axios from "axios";

const form = new FormData();
form.append("files", "/home/daniel/Pobrane/autumn_forest_park_128379_1280x720.jpg");

const options = {
  method: 'POST',
  url: 'http://localhost:1337/api/upload/',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5MTQ5MTk2LCJleHAiOjE2NzE3NDExOTZ9.RcbnPV8ZBY-Kba9l4HfDnGRyiIsLv4xcZr2FEW1x2to'
  },
  data: '[form]'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

After an upload you will receive

```json
[
	{
		"id": 2,
		"name": "autumn_forest_park_128379_1280x720.jpg",
		"alternativeText": null,
		"caption": null,
		"width": 1280,
		"height": 720,
		"formats": {
			"thumbnail": {
				"name": "thumbnail_autumn_forest_park_128379_1280x720.jpg",
				"hash": "thumbnail_autumn_forest_park_128379_1280x720_3c5d8f1957",
				"ext": ".jpg",
				"mime": "image/jpeg",
				"path": null,
				"width": 245,
				"height": 138,
				"size": 10.91,
				"url": "/uploads/thumbnail_autumn_forest_park_128379_1280x720_3c5d8f1957.jpg"
			},
			"small": {
				"name": "small_autumn_forest_park_128379_1280x720.jpg",
				"hash": "small_autumn_forest_park_128379_1280x720_3c5d8f1957",
				"ext": ".jpg",
				"mime": "image/jpeg",
				"path": null,
				"width": 500,
				"height": 281,
				"size": 46.72,
				"url": "/uploads/small_autumn_forest_park_128379_1280x720_3c5d8f1957.jpg"
			},
			"medium": {
				"name": "medium_autumn_forest_park_128379_1280x720.jpg",
				"hash": "medium_autumn_forest_park_128379_1280x720_3c5d8f1957",
				"ext": ".jpg",
				"mime": "image/jpeg",
				"path": null,
				"width": 750,
				"height": 422,
				"size": 107.06,
				"url": "/uploads/medium_autumn_forest_park_128379_1280x720_3c5d8f1957.jpg"
			},
			"large": {
				"name": "large_autumn_forest_park_128379_1280x720.jpg",
				"hash": "large_autumn_forest_park_128379_1280x720_3c5d8f1957",
				"ext": ".jpg",
				"mime": "image/jpeg",
				"path": null,
				"width": 1000,
				"height": 563,
				"size": 191.93,
				"url": "/uploads/large_autumn_forest_park_128379_1280x720_3c5d8f1957.jpg"
			}
		},
		"hash": "autumn_forest_park_128379_1280x720_3c5d8f1957",
		"ext": ".jpg",
		"mime": "image/jpeg",
		"size": 320.11,
		"url": "/uploads/autumn_forest_park_128379_1280x720_3c5d8f1957.jpg",
		"previewUrl": null,
		"provider": "local",
		"provider_metadata": null,
		"createdAt": "2022-11-22T20:36:15.982Z",
		"updatedAt": "2022-11-22T20:36:15.982Z"
	}
]
```

get his `id`. In our case it is `2`. Now you can connect uploaded image with meal created in prev step.

Meal id: 1,
Image id: 2,
It is image of `ingredients`.

```javascript
import axios from "axios";

const options = {
  method: 'PUT',
  url: 'http://localhost:1337/api/meals/1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5MTQ5MTk2LCJleHAiOjE2NzE3NDExOTZ9.RcbnPV8ZBY-Kba9l4HfDnGRyiIsLv4xcZr2FEW1x2to'
  },
  data: {data: {ingredients_image: 2}}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

The same workflow for `meal_image`.


To add social media run:

```javascript
import axios from "axios";

const options = {
  method: 'PUT',
  url: 'http://localhost:1337/api/meals/1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5MTQ5MTk2LCJleHAiOjE2NzE3NDExOTZ9.RcbnPV8ZBY-Kba9l4HfDnGRyiIsLv4xcZr2FEW1x2to'
  },
  data: {data: {social_media_post: 'https://twitch.tv'}}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

You can see that now we increased `adm_token` by `100`
