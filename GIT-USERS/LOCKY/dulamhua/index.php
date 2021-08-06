<?php

$rf = "dulamhua";

require("handlers/home_handler.php");
require("handlers/about_handler.php");
require("handlers/contact_handler.php");
require("handlers/comment_handler.php");
require("handlers/sign_handler.php");

require("Toro.php");

// ToroHook::add("404", function() {
//     echo "<center>You can't see me now.</center>";
// });

Toro::serve(array(
    $rf."/" => "HomeHandler",
    $rf."/about" => "AboutHandler",
    $rf."/contact" => "ContactHandler",
    $rf."/comment" => "CommentHandler",
    $rf."/signup" => "SignHandler"
));
?>