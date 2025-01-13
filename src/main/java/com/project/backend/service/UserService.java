package com.project.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.project.backend.model.dto.UserDto;
import com.project.backend.model.entity.Endereco;
import com.project.backend.model.entity.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.UserService;

@Service
public class UserService {

    private UserRepository userRepository;

    private UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto create(UserDto newUser) {
        Endereco endereco = convertToEndereco(newUser);
        User user = userRepository.save(convertToUser(newUser, endereco));
        return convertToUserDto(user);
    }

    public UserDto update(UserDto user) {
        return userRepository.findById(user.getId())
                .map(existingUser -> create(user))
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    public void delete(UUID id) {
        userRepository.findById(id)
                .ifPresentOrElse(
                        existingUser -> userRepository.deleteById(id),
                        () -> {
                            throw new RuntimeException("User not found!");
                        });
    }

    public List<UserDto> getAll() {
        List<User> usersList = userRepository.findAll();
        List<UserDto> usersDtoList = new ArrayList<>();

        usersList.forEach(user -> usersDtoList.add(convertToUserDto(user)));

        return usersDtoList;
    }

    private Endereco convertToEndereco(UserDto userDto) {
        Endereco endereco = new Endereco();
        endereco.setCep(userDto.getCep());
        endereco.setEstado(userDto.getEstado());
        endereco.setCidade(userDto.getCidade());
        endereco.setBairro(userDto.getBairro());
        endereco.setRua(userDto.getRua());
        endereco.setNumero(userDto.getNumero());
        endereco.setComplemento(userDto.getComplemento());
        return endereco;
    }

    private User convertToUser(UserDto userDto, Endereco endereco) {
        User user = new User();
        user.setId(userDto.getId());
        user.setNome(userDto.getNome());
        user.setCpf(userDto.getCpf());
        user.setNascimento(userDto.getNascimento());
        user.setEmail(userDto.getEmail());
        user.setEndereco(endereco);
        return user;
    }

    private UserDto convertToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setNome(user.getNome());
        userDto.setCpf(user.getCpf());
        userDto.setNascimento(user.getNascimento());
        userDto.setEmail(user.getEmail());

        Endereco endereco = user.getEndereco();
        userDto.setCep(endereco.getCep());
        userDto.setEstado(endereco.getEstado());
        userDto.setCidade(endereco.getCidade());
        userDto.setBairro(endereco.getBairro());
        userDto.setRua(endereco.getRua());
        userDto.setNumero(endereco.getNumero());
        userDto.setComplemento(endereco.getComplemento());
        return userDto;
    }
}
