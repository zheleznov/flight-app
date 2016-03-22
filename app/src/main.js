import router from './router.js';
import {airportsAPIKey} from './configs.js';


let $ = window.jQuery;

//
$(function() {
    $('body').find('.airports').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: "//www.air-port-codes.com/search/",
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    term: request.term, // input field value
                    limit: 7, // default is 30
                    size: 3, // default is 0
                    key: airportsAPIKey // dont forget to add your API Key from your air-port-codes.com account
                },
                success: function( data ) {
                    if (data.status) { // success
                        response( $.map( data.airports, function( item ) {
                            let storage = localStorage.airports !== undefined ? JSON.parse(localStorage.airports) : [];
                            var result = false;

                            storage.forEach((elem)=>{
                                if(elem.iata === item.iata) result = true;
                            });

                            if(!result) storage.push(item);

                            localStorage.airports = JSON.stringify(storage);

                            return {
                                label: item.name + ' (' + item.iata + ')',
                                value: item.name + ' (' + item.iata + ')',
                                code: item.iata
                            }
                        }));
                    } else { // no results
                        response();
                    }
                }
            });
        },
        select: function( event, ui ) {
            // do something for click event
            $('body').find('#air-code').val(ui.item.code);
        }
    });
});




