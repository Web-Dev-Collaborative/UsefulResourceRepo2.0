@extends('layouts.master')


@section('content')
<section class="slide" id="slide1" data-slide="1">
	<div class="container">
		<h1>What we provide...</h1>
		{{$title}}
		{{$title}}
		{{$title}}
		{{$title}}
	</div>
</section>

<section class="slide" id="slide2" data-slide="2" data-stellar-background-ratio="0.9">
	<div class="container">
		<div class="two column stackable ui grid">
			<div class="column">
				<div class="ui segment">
					<h2><i class="android icon"></i>Available in Play Store</h2>
					<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
					<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
				</div>
			</div>
			<div class="column">
				<div class="ui segment">
					<h2><i class="apple icon"></i>Available in AppStore</h2>
					<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
					<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
				</div>
			</div>
		</div>
	</div>
</section>	

<section class="slide" id="slide3" data-slide="3">
	<div class="container">
		{{$title}}
		{{$title}}
		{{$title}}
		{{$title}}
	</div>
</section>		
@stop