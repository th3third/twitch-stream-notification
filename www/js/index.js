/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        window.plugins.OneSignal.startInit("", "")
                                .inFocusDisplaying("Notification")
                                .endInit();
    }
};

var online;

function start()
{
    $("body").show().addClass("fadeIn").css({
        background: "#006bf3"
    }).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', getStreamStatus());
}

function showMessage(message)
{
    $("#message .text").text(message);
    $("#message").show().removeClass("slideOutDown").addClass("slideInUp");

    var notificationSound = new Media('http://www.mmhp.net/Sounds/Teleport.wav',
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    notificationSound.play();
}

function fadeInLogo()
{
    //$("#logo").show().addClass("fadeInDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', getStreamStatus());
}
function getStreamStatus()
{
    $.ajax({
        type: 'GET',    
        url: 'https://api.twitch.tv/kraken/streams/stream_name_here',
        headers: {
            'Client-ID': ''
        },
        success: function(data) {
            if (data["stream"] == null) {
                setOffline();
            } 
            else 
            {
                setOnline();
            }
        }
    });
}
function setOffline()
{
    if (online == false)
    {
        return false;
    }

    online = false;

    $("#starfield").removeClass("fadeIn").addClass("fadeOut");
    $("#bar").removeClass("slideInRight").addClass("slideOutRight");
    $("#status").show().removeClass("slideOutLeft").addClass("slideInLeft");
}
function setOnline()
{
    if (online == true)
    {
        return false;
    }

    online = true;

    $("#starfield").show().removeClass("fadeOut").addClass("fadeIn");
    $("#bar").show().removeClass("slideOutRight").addClass("slideInRight");
    $("#status").addClass("slideOutLeft").removeClass("slideInLeft");
    navigator.notification.beep(1);
}
function dismissMessage()
{
    $("#message").removeClass("slideInUp").addClass("slideOutDown");
}