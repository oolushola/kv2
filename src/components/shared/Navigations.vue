<template>
    <div>
        <div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">

			<!-- Sidebar mobile toggler -->
			<div class="sidebar-mobile-toggler text-center">
				<a href="#" class="sidebar-mobile-main-toggle">
					<i class="icon-arrow-left8"></i>
				</a>
				Navigation
				<a href="#" class="sidebar-mobile-expand">
					<i class="icon-screen-full"></i>
					<i class="icon-screen-normal"></i>
				</a>
			</div>


			<div class="sidebar-content">
				<div class="sidebar-user">
					<div class="card-body">
						<div class="media">
							<div class="mr-3">
								
									<span class="icon-user" style="font-size:40px;"></span>
								

							</div>

							<div class="media-body">
								<div class="media-title font-weight-semibold">Olushola Odejobi</div>
								<div class="font-size-xs opacity-50">
									<i class="icon-pin font-size-sm"></i> &nbsp;
								</div>
							</div>

							<div class="ml-3 align-self-center">
								<a href="#" class="text-white"><i class="icon-cog3"></i></a>
							</div>
						</div>
					</div>
				</div>

				<div class="card card-sidebar-mobile">
					<ul class="nav nav-sidebar" data-nav-type="accordion">

						
						<li class="nav-item">
							<a href="dashboard" class="nav-link">
								<i class="icon-home4"></i>
								<span>Dashboard</span>
							</a>
						</li>
						

						
						<li class="nav-item">
							<a href="performance-metrics/'.$userRole.'/'.$usertIdentity" class="nav-link">
								<i class="icon-stats-bars2"></i>
								<span>Performance Metric</span>
							</a>
						</li>
						

						<li class="nav-item-header">
              <div class="text-uppercase font-size-xs line-height-xs">TRIPS
               
                <span class="badge bg-blue-400 align-right ml-auto">10 Unresolved</span>
                
                </div><i class="icon-menu" title="Forms"></i>
            </li>
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link"><i class="icon-cube3"></i> <span>Orders</span></a>

							<ul class="nav nav-group-sub" data-submenu-title="Starter kit">
							
								<li class="nav-item">
									<a href="truck-availability" class="nav-link">
										Truck Availability</a>
								</li>
								<li class="nav-item">
									<a href="trips" class="nav-link ">
										Create New Trip</a>
								</li>
								<li class="nav-item">
									<a href="truck-availability-list" class="nav-link">
										Create Trip From Availability</a>
								</li>
								<li class="nav-item">
									<a href="update-trip" class="nav-link">Update Existing Trip</a>
								</li>
								

								
								<li class="nav-item">
									<a href="view-orders" class="nav-link">
									Trip Database</a>
								</li>
								<li class="nav-item">
									<a href="voided-trips" class="nav-link">
									Voided Trips</a>
								</li>
								<li class="nav-item"><a href="generate-report" class="nav-link">Report</a></li>
								<li class="nav-item"><a href="on-journey-trips'" class="nav-link">Trips on Journey</a></li>
								<li class="nav-item"><a href="request-transporter-payment'" class="nav-link">Request Payment</a></li>
								
							</ul>
						</li>
						
						<li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">FINANCE SECTION</div> <i class="icon-menu" title="Forms"></i></li>
						<li class="nav-item nav-item-submenu nav-item-open">
							<a href="#" class="nav-link"><i class="icon-piggy-bank"></i> <span>Financials</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels" style="display: block;">
								<li class="nav-item">
									<router-link to="/financials/overview" class="nav-link font-weight-semibold">
										<i class="icon-meter2"></i>
										<span>Overview</span>
									</router-link>
								</li>
								<li class="nav-item">
									<a href="'financials/dashboard'" class="nav-link font-weight-semibold">
										<i class="icon-eye"></i>
										<span>Trip Database</span>
									</a>
								</li>
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-semibold"><i class="icon-credit-card"></i> Receivables</a>
									<ul class="nav nav-group-sub" style="display: none;">
										<li class="nav-item">
											<a href="#" class="nav-link">
												<i class="icon-meter-slow"></i>
												<span>Receivables Tracker</span>
											</a>
										</li>
										<li class="nav-item">
											<a href="invoices'" class="nav-link">
												<i class="icon-pencil3"></i>
												<span>Invoices</span>
											</a>
										</li>
										<li class="nav-item">
											<a href="all-invoiced-trips'" class="nav-link">
												<i class="icon-books"></i>
												<span>Invoiced</span>
											</a>
										</li>
										<li class="nav-item">
											<a href="'incentives'" class="nav-link">
												<i class="icon-alarm-add"></i>
												<span>Incentives</span>
											</a>
										</li>
										<li class="nav-item">
											<a href="vat-rate" class="nav-link">
												<i class="icon-cogs"></i>
												<span>Vat Rate</span>
											</a>
										</li>
									</ul>
								</li>
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-semibold"><i class="icon-wallet"></i> Payables
										<span class="badge bg-danger align-self-center ml-2">
											10 Pending
										</span>
									</a>
									<ul class="nav nav-group-sub" style="display: none;">
									<li class="nav-item">
										<a href="payment-request" class="nav-link">
											<i class="icon-git-pull-request"></i>
											<span>Payment Requests</span>
											
										</a>
									</li>
									<li class="nav-item">
										<a href="transporter-rate" class="nav-link">
											<i class="icon-calculator3"></i>
											<span>Transporter Rate</span>
										</a>
									</li>
									<li class="nav-item">
										<a href="bulk-payment'" class="nav-link">
											<i class="icon-spray"></i>
											<span>Bulk Payment</span>
										</a>
									</li>
									<li class="nav-item">
										<a href="local-purchase-order'" class="nav-link">
											<i class="icon-feed"></i>
											<span>L.P.O.</span>
										</a>
									</li>

									</ul>
								</li>
							</ul>
						</li>
						

						 
						<li class="nav-item-header">
              <div class="text-uppercase font-size-xs line-height-xs">FOR AD-HOC STAFFS</div> 
              <i class="icon-menu" title="Forms"></i>
            </li>
                        
						<li class="nav-item">
							<a href="offloading/my-trips-view" class="nav-link">
								<i class="icon-truck"></i>
								<span>My Trips</span>
								<span class="badge bg-success align-self-center ml-auto"></span>
							</a>
						</li>

						
						<li class="nav-item-header">
              <div class="text-uppercase font-size-xs line-height-xs">Users</div> 
              <i class="icon-menu" title="Forms"></i>
            </li>
                        
						<li class="nav-item">
							<a href="user-registration" class="nav-link">
								<i class="icon-user-plus"></i>
								<span>Register User</span>
								<span class="badge bg-success align-self-center ml-auto"></span>
							</a>
						</li>

						<li class="nav-item">
							<a href="users/assign-adhoc-staff-to-region'" class="nav-link">
								<i class="icon-users2"></i>
								<span>Assign an ad-hoc to a region</span>
								<span class="badge bg-success align-self-center ml-auto"></span>
							</a>
						</li>
						
						<li class="nav-item-header">
              <div class="text-uppercase font-size-xs line-height-xs">Our Clients</div> 
              <i class="icon-menu" title="Forms"></i>
            </li>

						<li class="nav-item">
							<a href="clients" class="nav-link">
								<i class="icon-list-ordered"></i>
								<span>Clients</span>
								<span class="badge bg-success align-self-center ml-auto">8 Active Clients</span>
							</a>
						</li>

						
						<li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">Administrative Purpose</div> <i class="icon-menu" title="Main"></i></li>

							<li class="nav-item nav-item-submenu">
								<router-link to="preferences" class="nav-link">
								<a><i class="icon-cog"></i> <span>Preference Settings</span></a>
								</router-link>

								<ul class="nav nav-group-sub" data-submenu-title="Starter kit">
									<li class="nav-item">
										<router-link to="/preferences/company-profile" class="nav-link" activeClass="active">Kaya Profile</router-link>
									</li>
									<li class="nav-item">
										<router-link to="/preferences/products" class="nav-link">Products</router-link>
									</li>
									<li class="nav-item">
										<router-link to="/preferences/truck-types" class="nav-link" activeClass="active">Truck Types</router-link>
									</li>
									<li class="nav-item">
										<a href="/preferences/loading-sites" class="nav-link">Loading Sites</a>
									</li>
									<li class="nav-item">
										<a href="cargo-availability" class="nav-link">Available Cargo</a>
									</li>
									<li class="nav-item">
										<a href="kaya-target" class="nav-link">Targets</a>
									</li>
									<li class="nav-item">
										<a href="invoice-subheading'" class="nav-link">Invoice Subheading</a>
									</li>
									<li class="nav-item">
										<a href="buh-target'" class="nav-link">BUH Monthly Target</a>
									</li>
								</ul>
							</li>
					
						
						<li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">TRANSPORTATION</div> <i class="icon-menu" title="Components"></i></li>

						<li class="nav-item">
							<router-link to="/transporters" activeClass="active" class="nav-link">
								<i class="icon-train2"></i>
								<span>Transporter</span>
							</router-link>
						</li>
            			<li class="nav-item">
							<router-link to="/trucks" activeClass="active" tag="a" class="nav-link">
								<i class="icon-truck"></i>
								<span>Trucks</span>
							</router-link>
						</li>
            			<li class="nav-item">
							<router-link to="/drivers" class="nav-link" activeClass="active" tag="a">
								<i class="icon-steering-wheel"></i>
								<span>Drivers</span>
							</router-link>
						</li>
					</ul>
				</div>
			</div>			
		</div>
    </div>
</template>