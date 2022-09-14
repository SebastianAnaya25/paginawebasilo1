$( function() {
    var objetivos = $( '[rel~=tooltip]' ),
    objetivo  = false,
    tooltip   = false,
    title     = false;
 
    objetivos.bind( 'mouseenter', function(){
        objetivo  = $( this );
        tip     = objetivo.attr( 'title' );
        tooltip = $( '<div id="tooltip_lawebera"></div>' );
 
        if( !tip || tip == '' ){
            return false;
        }
 
        objetivo.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 ).html( tip ).appendTo( 'body' );
 
        var inicializar_tooltip = function(){
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
 
            var pos_izquierda = objetivo.offset().left + ( objetivo.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
            pos_superior  = objetivo.offset().top - tooltip.outerHeight() - 20;
 
            if( pos_izquierda < 0 ){ pos_izquierda = objetivo.offset().left + objetivo.outerWidth() / 2 - 20; tooltip.addClass( 'izquierda' ); } else tooltip.removeClass( 'izquierda' ); if( pos_izquierda + tooltip.outerWidth() > $( window ).width() ){
                pos_izquierda = objetivo.offset().left - tooltip.outerWidth() + objetivo.outerWidth() / 2 + 20;
                tooltip.addClass( 'derecha' );
            } else {
                tooltip.removeClass( 'derecha' );
            }
 
            if( pos_superior < 0 ){
                var pos_superior  = objetivo.offset().top + objetivo.outerHeight();
                tooltip.addClass( 'superior' );
            } else {
                tooltip.removeClass( 'superior' );
            }
 
            tooltip.css( { left: pos_izquierda, top: pos_superior } ).animate( { top: '+=10', opacity: 1 }, 50 );
        };
 
        inicializar_tooltip();
 
        $( window ).resize( inicializar_tooltip );
 
        var remover_tooltip = function(){
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function(){
                $( this ).remove();
            });
 
            objetivo.attr( 'title', tip );
        };
 
        objetivo.bind( 'mouseleave', remover_tooltip );
        tooltip.bind( 'click', remover_tooltip );
    });
});