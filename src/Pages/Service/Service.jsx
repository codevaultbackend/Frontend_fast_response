import React from 'react'
import ServiceTopBanner from '../../components/service-top-banner/ServiceTopBanner'
import TopserviceCards from '../../components/topserviceCards/topserviceCards'
import ExploreServices from '../../components/ExploreServices/ExploreServices'
import ServiceTrack from '../../components/ServiceTrack/ServiceTrack'
import Omgservice from '../../components/Omgservice/Omgservice'
import ReadyToService from '../../components/ReadyToService/ReadyToService'

function Service() {
  return (
    <div className='service'>
      <ServiceTopBanner/>
      <TopserviceCards />
      <ExploreServices />
      <ServiceTrack />
      <Omgservice />
      <ReadyToService />
    </div>
  )
}

export default Service
