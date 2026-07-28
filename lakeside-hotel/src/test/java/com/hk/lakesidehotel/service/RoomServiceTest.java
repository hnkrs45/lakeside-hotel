package com.hk.lakesidehotel.service;

import com.hk.lakesidehotel.model.Room;
import com.hk.lakesidehotel.repository.RoomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private RoomService roomService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllRoomTypes() {
        when(roomRepository.findDistinctRoomTypes()).thenReturn(Arrays.asList("Single", "Double", "Suite"));

        List<String> roomTypes = roomService.getAllRoomTypes();

        assertEquals(3, roomTypes.size());
        assertTrue(roomTypes.contains("Suite"));
        verify(roomRepository, times(1)).findDistinctRoomTypes();
    }

    @Test
    void testGetRoomByIdSuccess() {
        Room room = new Room();
        room.setId(1L);
        room.setRoomType("Deluxe Suite");
        room.setRoomPrice(BigDecimal.valueOf(250));

        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));

        Optional<Room> foundRoom = roomService.getRoomById(1L);

        assertTrue(foundRoom.isPresent());
        assertEquals("Deluxe Suite", foundRoom.get().getRoomType());
        verify(roomRepository, times(1)).findById(1L);
    }
}
