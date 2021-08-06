<!-- include the header -->
<?php
require("template/header.php");		
?>


<div class="intro_form bg-amber">
		<div class="grid">
			<div class="row span12 apply_infor">

			
				<div class="panel span6 bg-white signup_innerdiv">
					<div class="panel-header">
						申請賭爛
					</div>
					<div class="panel-content ">
					<form class="" id="apply_form">
						<fieldset>
							
							<label>靶子名字(required.)</label>
							<div class="input-control text size5">
			    				<input type="text" value="" name="name" placeholder="輸入您想說話的對象的本名"/>
			    				<button class="btn-clear"></button>
							</div>
							<label>您的幹法(請務必擇一,required.)</label>
							<!-- <div class="input-control textarea size5">
			    				<textarea name="method" placeholder="請稍微簡述您的幹法"></textarea>
							</div> -->
							<div class="input-control radio default-style size5" style="text-align:left;">
							    <label>
							        <input type="radio" name = "method" value = "1"/>
							        <span class="check"></span>
							        直接幹，用力幹，放心幹。
							    </label>
							    <label>
							        <input type="radio" name = "method" value = "2"/>
							        <span class="check"></span>
							        靶子上台戴上耳機使得靶子聽不到射手說的話，直到抱怨結束，主持人詢問事件相關情境。
							    </label>
							</div>
							
							<label>備註(not required.)</label>
							<div class="input-control textarea size5">
			    				<textarea name="others" placeholder="有建議、特殊要求嗎?"></textarea>
							</div>
							<div class="grid">
								<div class="row">
									<div class="">
										<canvas id='textCanvas' width=100 height=40></canvas>
									</div>
									<div class="input-control text size5">
					    				<input type="text" value="" name="name" placeholder="請輸入以上認證碼(case sensitive)"/>
					    				<button class="btn-clear"></button>
									</div>
								</div>
							</div>
							<button class="large" id="send_btn" type="submit"><i class=" icon-pencil on-left"></i>確定報名</button>
							
						</fieldset>
					</form>
					</div>
				</div>
				<div class="panel span6 bg-white signup_innerdiv">
					<div class="panel-header">
						報名切結書
					</div>
					<div class="panel-content">
						
						<b>請再次詳細閱讀以下切結事項，當您按下報名按鈕即同意本切結書內容，絕無異議。</b>
						<ol><li>我對著日光燈發誓，今天本人所陳述的事情都是真的，絕無半點虛假。</li>
						<li>我保證，今天秉持著朋友的情誼與信任，在場絕對不會偷生氣，偷生氣就喝涼水，並且日後不會有報復行為。</li>
						<li>討論的事件，必須是自身相關，請勿爆料，留點故事給別人幹。活動過程中，如需問候其家人，只限一等親內。</li>
						<li>活動過程中，可帶語助詞但是不能人身攻擊或帶有種族歧視意味。</li>
						<li>活動過程中，請保持你的幽默感，認真就輸了！</li>
						<li>當日活動，我只會帶著一顆會噗通噗通狂跳的心和會動的嘴巴，不會攜帶槍砲彈藥等危險物品，否則魯一輩子。</li>
						<li>為了我的腎臟，我不會在現場喝飲料。</li><li><b>本活動的宗旨是維修各位的友誼，在活動結束後，決不向相關人士提起法律訴訟。</b></li>
						</ol>
						<img id="agree_img" class="span2" src="img/agree.jpg">
						<br/>
					</div>
				</div>
				
			</div>
		</div>
</div>

<!-- include the header -->
<?php
require("template/footer.php");		
?>