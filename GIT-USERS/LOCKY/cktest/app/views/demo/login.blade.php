@extends('layouts.master')

@section('content')
	<section class="slide" id="loginslide">
		<div class="loginContainer">
			<div class="ui form segment">
				<div class="field">
					<label>帳號</label>
					<div class="ui left labeled icon input">
						<input type="text" placeholder="Username">
						<i class="user icon"></i>
						<div class="ui corner label">
							<i class="icon asterisk"></i>
						</div>
					</div>
				</div>
				<div class="field">
					<label>密碼</label>
					<div class="ui left labeled icon input">
						<input type="password">
						<i class="lock icon"></i>
						<div class="ui corner label">
							<i class="icon asterisk"></i>
						</div>
					</div>
				</div>
				<div class="ui error message">
					<div class="header">We noticed some issues</div>
				</div>
				<div class="ui blue submit button">登入</div>
			</div>
		</div>
	</section>
@stop