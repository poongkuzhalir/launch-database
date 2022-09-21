import React, { useEffect, useState } from "react";
import { Store } from "redux";
import { getDistance, isPointWithinRadius } from "geolib";
import { StyledCloudGrid, StyledSpinnerWrapper } from "./cloud-provider.style";
import { SelectChangeEvent } from "@mui/material/Select";
import { CircularProgress } from "@mui/material";
import CloudProviderTable from "../../components/cloud-provider-table/cloud-provider-table";
import CloudSelect from "../../components/cloud-select/cloud-select";
import CloudButton from "../../components/cloud-button/cloud-button";
import { ICloudList } from "../../interfaces/ICloudLists";
import { providerDistance } from "../../mocks/cloud-provider";

interface IProps {
  store: Store;
}

interface IGeoLocation {
  latitude: number;
  longitude: number;
}

const CloudProvider = (props: IProps) => {
  const { store } = props;
  const [cloudLists, setCloudLists] = useState<ICloudList[]>([]);
  const [cloudListsToShow, setCloudListsToShow] = useState<ICloudList[]>([]);
  const [cloudProvider, setCloudProvider] = useState<string[]>([]);
  const [providerName, setProviderName] = React.useState<string[]>([]);
  const [distanceSelected, setDistanceSelected] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);
  const cloudProviderList: string[] = [];

  const [currentLocation, setCurrentLocation] = useState<IGeoLocation>({
    latitude: 0,
    longitude: 0,
  });

  const getCloudLists = () => {
    store.subscribe(() => {
      const { clouds } = store.getState();
      if (clouds.length !== 0) {
        clouds?.map((item: ICloudList) => {
          const providerName = item.cloud_name.split("-")[0];
          if (cloudProviderList.indexOf(providerName) < 0)
            cloudProviderList.push(providerName);
          return cloudProviderList;
        });
        setCloudLists(clouds);
        setCloudListsToShow(clouds);
        setCloudProvider(cloudProviderList);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    getCloudLists();
  }, []);

  const resetAllFilters = () => {
    setCloudListsToShow(cloudLists);
    setProviderName([]);
    setDistanceSelected("");
  };

  const filterByProvider = (provider: string[], lists: ICloudList[]) => {
    return provider.length !== 0
      ? lists.filter(
          (item) => provider.indexOf(item.cloud_name.split("-")[0]) > -1
        )
      : lists;
  };

  const filterByDistance = (
    distance: string | string[],
    lists: ICloudList[]
  ) => {
    return distance !== ""
      ? lists.filter((item: { geo_latitude: number; geo_longitude: number }) =>
          calculateRadius(
            currentLocation,
            item.geo_latitude,
            item.geo_longitude,
            distance
          )
        )
      : lists;
  };

  const handleChangeProvider = (
    event: SelectChangeEvent<typeof providerName>
  ) => {
    const {
      target: { value },
    } = event;

    const selectedProvider =
      typeof value === "string" ? value.split(",") : value;

    let updatedLists = filterByDistance(distanceSelected, cloudLists);
    updatedLists = filterByProvider(selectedProvider, updatedLists);

    setCloudListsToShow(updatedLists);
    setProviderName(selectedProvider);
  };

  const handleChangeDistance = (
    event: SelectChangeEvent<typeof providerName>
  ) => {
    const {
      target: { value },
    } = event;

    let updatedLists = filterByProvider(providerName, cloudLists);
    updatedLists = filterByDistance(value, updatedLists);

    setCloudListsToShow(updatedLists);
    setDistanceSelected(value);
  };

  const calculateRadius = (
    currentLocation: IGeoLocation,
    latitude: number,
    longitude: number,
    radius: any
  ) => {
    var pdis = isPointWithinRadius(
      currentLocation,
      { latitude, longitude },
      parseInt(radius) * 1000
    );

    return pdis;
  };

  return (
    <>
      <StyledCloudGrid>
        <CloudSelect
          isMultiple={true}
          lists={cloudProvider}
          labelName="Cloud Provider"
          selectedValue={providerName}
          handleChange={handleChangeProvider}
          selectLabelId="cloud-provider-label"
        />

        <CloudSelect
          isMultiple={false}
          lists={providerDistance}
          labelName="Distance"
          selectedValue={distanceSelected}
          handleChange={handleChangeDistance}
          selectLabelId="distance-label"
        />
        <CloudButton text="Reset filters" handleChange={resetAllFilters} />
      </StyledCloudGrid>

      {isLoading ? (
        <StyledSpinnerWrapper>
          <CircularProgress
            thickness={4}
            size={50}
            style={{ color: "#006295" }}
          />
        </StyledSpinnerWrapper>
      ) : (
        <CloudProviderTable
          listsToShow={cloudListsToShow}
          radius={distanceSelected}
        />
      )}
    </>
  );
};

export default CloudProvider;
