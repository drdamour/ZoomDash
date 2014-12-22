function ZoomDashVM()
{
	var self = this;

	this.PanelConfigs = ko.observableArray([
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" ),
		new IFramePanel( "http://talkshowhost.net/" )
	]);


	//Config
	this.transitionTime = 2000; //how long the transition should last
	this.dashboardTime = 3000; //how long to show the whole dashboard
	this.panelTime = 8000; //how long to show a specific panel
	this.TransitionsTillFullRefresh = ko.observable(300);
	this.TotalIterations = 0;

	this.PanelIndex = ko.observable(null);

	this.ZoomOutTimeout = null;
	this.NextPanelTimeout = null;

	this.PanelIndex.subscribe(
		function( NewIndex )
		{
			//Reload the app...cause it probably got stale
			if(self.TotalIterations++ == self.TransitionsTillFullRefresh())
			{
				self.Reload();
				return;
			}

			$(self.Panels[NewIndex]).zoomTo({
				animationendcallback : self.AfterZoomIn,
				duration: self.transitionTime,
				targetsize: 1,
			});
		}
	);


	this.ZoomOut = function()
	{
		$(".slideshowContainer").zoomTo({
			animationendcallback : self.AfterZoomOut,
			targetsize: 1,
			duration: self.transitionTime,
		});			
	}

	this.NextPanel = function()
	{
		var NextIndex = (self.PanelIndex()+1) % self.Panels.length;
		self.PanelIndex( NextIndex )
	}
	this.PreviousPanel = function()
	{
		var PrevIndex = (self.PanelIndex() + self.Panels.length - 1)  % self.Panels.length;
		self.PanelIndex( PrevIndex )
	}

	this.AfterZoomOut = function()
	{
		self.NextPanelTimeout = window.setTimeout(
			self.NextPanel, self.dashboardTime
		)
	}

	this.AfterZoomIn = function()
	{

		//Call the Refresh() method of the next panel while it's hidden
		var NextPanelIndex = (self.PanelIndex()+1)%self.PanelConfigs().length;
		var NextPanelConfig = self.PanelConfigs()[NextPanelIndex];
		if(NextPanelConfig.Refresh) NextPanelConfig.Refresh( self.Panels[NextPanelIndex], self.panelTime );

		self.ZoomOutTimeout = window.setTimeout(
			self.ZoomOut, self.panelTime
		)
	}
	

	this.Reload = function()
	{
		window.location.reload();
	}

	this.Start = function()
	{
	 	self.Panels = $(".slideshowContainer .zoomContainer .zoomTarget");
	 	self.PanelIndex(0);
	}

	//TODO: maybe i shoudl data bind to the body..seems a better option
	window.onkeydown = function(e){
		//left
    	if (e.keyCode == 37) { 
    		window.clearTimeout( self.ZoomOutTimeout );
			window.clearTimeout( self.NextPanelTimeout );
    		self.PreviousPanel();
    		return false;
    	}
    	//right
    	if (e.keyCode == 39) {
			window.clearTimeout( self.ZoomOutTimeout );
			window.clearTimeout( self.NextPanelTimeout );
    		self.NextPanel();
    		return false;
    	}

	};
}

function IFramePanel( URL )
{
	this.URL = ko.observable(URL);
	
	this.Type = "IFramePanel";

	this.Refresh = function( DomContainer, TimeTillTransition )
	{
		var frame = DomContainer.getElementsByTagName('iframe')[0];
					
		var src = frame.src;
		frame.src = src;
	}
}