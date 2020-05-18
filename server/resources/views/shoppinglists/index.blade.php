<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<ul>
    @foreach ($shoppinglists as $shoppinglist)
        <li>Einkaufsliste  <a href="shoppinglists/{{$shoppinglist->id}}">{{$shoppinglist->id}} bis {{$shoppinglist->until}}</a></li>
    @endforeach
</ul>
</body>
</html>
