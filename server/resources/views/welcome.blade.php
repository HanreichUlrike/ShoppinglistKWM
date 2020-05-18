<!DOCTYPEhtml>
    <html>
        <head>
            <title></title>
        </head>
        <body>
            <h1>Einkaufsliste</h1>

            <ul>
                @foreach ($shoppinglists as $shoppinglist)
                <li>Liste: {{$shoppinglist->id}} bis: {{$shoppinglist->until}}</li>
                @endforeach
                </ul>
        </body>
    </html>
